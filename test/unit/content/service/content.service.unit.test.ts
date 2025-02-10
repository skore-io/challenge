import { Test, TestingModule } from '@nestjs/testing';
import { suite, test } from '@testdeck/jest';
import { ContentService } from '../../../../src/content/service';
import { ContentRepository } from '../../../../src/content/repository';
import {
  BadRequestException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Content } from '../../../../src/content/entity';
import * as fs from 'fs';

@suite
export class ContentServiceUnitTest {
  private contentService: ContentService;
  private contentRepository: ContentRepository;

  private readonly mockContent = (type: string, format?: string, url?: string): Content =>
    ({
      id: '4372ebd1-2ee8-4501-9ed5-549df46d0eb0',
      title: `Test ${type}`,
      description: `Description for ${type}`,
      url: url || `http://localhost:3000/uploads/dummy.${format}`,
      created_at: new Date('2025-01-31T23:39:54.236Z'),
      total_likes: 10,
      type,
    }) as Content;

  async before() {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContentService,
        {
          provide: ContentRepository,
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    this.contentService = module.get<ContentService>(ContentService);
    this.contentRepository = module.get<ContentRepository>(ContentRepository);
  }

  @test
  async '[getContent] Should return content if found'() {
    jest.spyOn(this.contentRepository, 'findOne').mockResolvedValue(this.mockContent('pdf'));

    const result = await this.contentService.getContent('4372ebd1-2ee8-4501-9ed5-549df46d0eb0');
    expect(result).toMatchObject({ id: '4372ebd1-2ee8-4501-9ed5-549df46d0eb0' });
  }

  @test
  async '[getContent] Should throw NotFoundException if content is not found'() {
    jest.spyOn(this.contentRepository, 'findOne').mockResolvedValue(null);
    await expect(this.contentService.getContent('invalid-id')).rejects.toThrow(NotFoundException);
  }

  @test
  async '[getFileSize] Should return file size if file exists'() {
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest.spyOn(fs, 'statSync').mockReturnValue({ size: 50000 } as fs.Stats);

    const size = await this.contentService.getFileSize('path/to/file.pdf');
    expect(size).toBe(50000);
  }

  @test
  async '[getFileSize] Should return 0 if file does not exist'() {
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    const size = await this.contentService.getFileSize('path/to/nonexistent.pdf');
    expect(size).toBe(0);
  }

  @test
  async '[generateSignedUrl] Should generate a valid signed URL'() {
    const signedUrl = this.contentService.generateSignedUrl('http://localhost/file.pdf');
    expect(signedUrl).toMatch(/http:\/\/localhost\/file\.pdf\?expires=\d+&signature=\w+/);
  }

  @test
  async '[generateMetadataForType] Should return correct metadata for pdf'() {
    const metadata = this.contentService.generateMetadataForType(this.mockContent('pdf'), 100000);
    expect(metadata).toEqual({ author: 'Unknown', pages: 2, encrypted: false });
  }

  @test
  async '[generateMetadataForType] Should return correct metadata for image'() {
    const metadata = this.contentService.generateMetadataForType(this.mockContent('image'), 50000);
    expect(metadata).toEqual({ resolution: '1920x1080', aspect_ratio: '16:9' });
  }

  @test
  async '[generateMetadataForType] Should return correct metadata for video'() {
    const metadata = this.contentService.generateMetadataForType(this.mockContent('video'), 200000);
    expect(metadata).toEqual({ duration: 2, resolution: '1080p' });
  }

  @test
  async '[generateMetadataForType] Should return correct metadata for link'() {
    const metadata = this.contentService.generateMetadataForType(this.mockContent('link', '', 'https://example.com'), 1000);
    expect(metadata).toEqual({ trusted: true });
  }

  @test
  async '[generateMetadataForType] Should return empty metadata for unknown type'() {
    const metadata = this.contentService.generateMetadataForType(this.mockContent('unknown'), 1000);
    expect(metadata).toEqual({});
  }

  @test
  async '[provision] Should return provisioned content with correct metadata'() {
    jest.spyOn(this.contentRepository, 'findOne').mockResolvedValue(this.mockContent('pdf', 'pdf'));
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest.spyOn(fs, 'statSync').mockReturnValue({ size: 50000 } as fs.Stats);
    jest.spyOn(this.contentService as any, 'generateSignedUrl').mockReturnValue('http://signed-url');

    const result = await this.contentService.provision('4372ebd1-2ee8-4501-9ed5-549df46d0eb0');
    expect(result).toMatchObject({
      type: 'pdf',
      allow_download: true,
      is_embeddable: true,
      format: 'pdf',
      bytes: 50000,
      metadata: { author: 'Unknown', pages: 1, encrypted: false },
    });
  }

  @test
  async '[provision] Should log file system errors but not fail'() {
    jest.spyOn(this.contentRepository, 'findOne').mockResolvedValue(this.mockContent('pdf', 'pdf'));
    jest.spyOn(fs, 'existsSync').mockImplementation(() => {
      throw new Error('File system error');
    });
    const loggerSpy = jest.spyOn(this.contentService['logger'], 'error').mockImplementation(() => { });

    const result = await this.contentService.provision('4372ebd1-2ee8-4501-9ed5-549df46d0eb0');
    expect(loggerSpy).toHaveBeenCalledWith(expect.stringContaining('File system error'));
    expect(result.bytes).toBe(0);
  }

  @test
  async '[provision] Should throw BadRequestException if content ID is missing'() {
    await expect(this.contentService.provision('')).rejects.toThrow(BadRequestException);
  }

  @test
  async '[provision] Should throw BadRequestException if content is not found'() {
    jest.spyOn(this.contentRepository, 'findOne').mockResolvedValue(null);

    await expect(
      this.contentService.provision('4372ebd1-2ee8-4501-9ed5-549df46d0eb0'),
    ).rejects.toThrow(BadRequestException);
  }

  @test
  async '[provision] Should throw BadRequestException if database query fails'() {
    jest.spyOn(this.contentRepository, 'findOne').mockRejectedValue(new Error('DB error'));

    await expect(
      this.contentService.provision('4372ebd1-2ee8-4501-9ed5-549df46d0eb0'),
    ).rejects.toThrow(BadRequestException);
  }

  @test
  async '[provision] Should throw BadRequestException if content type is missing'() {
    const mockContentWithoutType = {
      ...this.mockContent('pdf'),
      type: undefined,
    } as any;

    jest.spyOn(this.contentRepository, 'findOne').mockResolvedValue(mockContentWithoutType);
    const loggerSpy = jest.spyOn(this.contentService['logger'], 'warn').mockImplementation(() => { });

    await expect(
      this.contentService.provision('4372ebd1-2ee8-4501-9ed5-549df46d0eb0'),
    ).rejects.toThrow(BadRequestException);

    expect(loggerSpy).toHaveBeenCalledWith(
      expect.stringContaining('Missing content type for ID=4372ebd1-2ee8-4501-9ed5-549df46d0eb0'),
    );
  }

  @test
  async '[provision] Should throw BadRequestException if an unexpected error occurs'() {
    jest.spyOn(this.contentService, 'provisionContent').mockRejectedValue(new Error('Unexpected error'));
    const loggerSpy = jest.spyOn(this.contentService['logger'], 'error').mockImplementation(() => { });

    await expect(
      this.contentService.provision('4372ebd1-2ee8-4501-9ed5-549df46d0eb0'),
    ).rejects.toThrow(BadRequestException);

    expect(loggerSpy).toHaveBeenCalledWith(
      expect.stringContaining('Error during content provisioning: Error: Unexpected error'),
    );
  }
}
