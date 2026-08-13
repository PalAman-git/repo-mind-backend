import { Injectable } from '@nestjs/common';

@Injectable()
export class ChunkerService {

  private ignoredDirectories = [
    'node_modules',
    '.git',
    'dist',
    'build',
    'coverage',
  ];

  private allowedExtensions = [
    '.ts',
    '.js',
    '.tsx',
    '.jsx',
    '.py',
    '.java',
    '.cpp',
    '.c',
    '.cs',
    '.go',
    '.rs',
    '.json',
    '.md',
    '.yml',
    '.yaml',
    '.sql',
  ];

  shouldInclude(path: string): boolean {
    if (
      this.ignoredDirectories.some(dir =>
        path.split('/').includes(dir),
      )
    ) {
      return false;
    }

    return this.allowedExtensions.some(ext =>
      path.endsWith(ext),
    );
  }
}