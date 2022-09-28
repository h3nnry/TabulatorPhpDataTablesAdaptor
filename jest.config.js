module.exports = {
    preset: 'ts-jest',
    verbose: true,
    moduleFileExtensions: [
        'js',
        'ts',
        'json',
    ],
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.ts$',
    testPathIgnorePatterns: [
        '/node_modules/',
    ],
    globals: {
        'ts-jest': {
            tsConfig: './tsconfig.json'
        },
    }
};
