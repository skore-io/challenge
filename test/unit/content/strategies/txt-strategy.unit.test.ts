import { TxtStrategy } from 'src/content/strategies/txt-strategy'
import * as fs from 'fs'
import * as path from 'path'

describe('TxtStrategy', () => {
  let strategy: TxtStrategy
  let mockContent: any

  beforeAll(() => {
    strategy = new TxtStrategy()
    mockContent = {
      id: '4372ebd1-2ee8-4501-9ed5-549df46d0eb0',
      title: 'Test text',
      description: 'Description for text',
      url: 'file:///dummy.txt',
      created_at: new Date('2025-01-31T23:39:54.236Z'),
      total_likes: 10,
      type: 'text',
    }
  })

  it('should throw an error if content URL is missing', () => {
    expect(() => strategy.provision({ ...mockContent, url: '' }, '', 0)).toThrow(
      'Content URL is missing',
    )
  })

  it('should throw an error for invalid file path', () => {
    const invalidPathContent = { ...mockContent, url: 'file:///../../dummy.txt' }
    expect(() => strategy.provision(invalidPathContent, '', 0)).toThrow('Invalid file path')
  })

  it('should throw an error if file does not exist', () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(false)
    expect(() => strategy.provision(mockContent, '', 0)).toThrow(
      `File not found: ${path.join(__dirname, '../../..', 'static', 'dummy.txt')}`,
    )
  })

  it('should provision text content successfully', () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(true)
    jest.spyOn(fs, 'readFileSync').mockReturnValue('Sample text content')
    const result = strategy.provision(mockContent, '', 0)
    expect(result.contentBody).toBe(
      'Sample text content'.replace(/</g, '&lt;').replace(/>/g, '&gt;'),
    )
  })

  it('should sanitize text content', () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(true)
    jest.spyOn(fs, 'readFileSync').mockReturnValue('<script>alert("test")</script>')
    const result = strategy.provision(mockContent, '', 0)
    expect(result.contentBody).toBe('&lt;script&gt;alert("test")&lt;/script&gt;')
  })
})
