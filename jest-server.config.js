module.exports = {
    globals: {
        'ts-jest': {
            tsconfig: './tsconfig-server.json',
        },
    },
    moduleFileExtensions: ['js', 'json', 'ts'],
    rootDir: 'server',
    testRegex: '.*\\.spec\\.ts$',
    transform: {
        '^.+\\.(t|j)s$': 'ts-jest',
    },
    collectCoverage: true,
    coverageDirectory: '../coverage-server',
    collectCoverageFrom: ['**/*.(t|j)s', '!**/*.e2e-spec.(t|j)s'],
    testEnvironment: 'node',
}
