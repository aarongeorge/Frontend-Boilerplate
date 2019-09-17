module.exports = {
    'env': {
        'browser': true,
        'es6': true,
        'node': true
    },
    'parserOptions': {
        'allowImportExportEverywhere': false,
        'babelOptions': {
            'configFile': './babel.config.js'
        },
        'ecmaFeatures': {
            'experimentalObjectSpread': true,
            'globalReturn': false,
            'impliedStrict': true,
            'jsx': true
        },
        'ecmaVersion': 6,
        'parser': 'babel-eslint',
        'requireConfigFile': true,
        'sourceType': 'module'
    },
    'root': true,
    'rules': {
        'accessor-pairs': 'error',
        'array-bracket-newline': [
            'error',
            {'minItems': 2}
        ],
        'array-bracket-spacing': [
            'error',
            'never'
        ],
        'array-callback-return': 'error',
        'array-element-newline': [
            'error',
            {'minItems': 2}
        ],
        'arrow-body-style': [
            'error',
            'as-needed'
        ],
        'arrow-parens': [
            'error',
            'as-needed'
        ],
        'arrow-spacing': [
            'error',
            {
                'after': true,
                'before': true
            }
        ],
        'block-scoped-var': 'error',
        'block-spacing': 'error',
        'brace-style': [
            'error',
            'stroustrup',
            {'allowSingleLine': true}
        ],
        'callback-return': [
            'error',
            [
                'callback',
                'cb',
                'next'
            ]
        ],
        'camelcase': 'error',
        'capitalized-comments': 'off',
        'class-methods-use-this': 'off',
        'comma-dangle': [
            'error',
            'never'
        ],
        'comma-spacing': [
            'error',
            {
                'after': true,
                'before': false
            }
        ],
        'comma-style': [
            'error',
            'last'
        ],
        'complexity': 'off',
        'computed-property-spacing': [
            'error',
            'never'
        ],
        'consistent-return': 'off',
        'consistent-this': [
            'error',
            '_this'
        ],
        'constructor-super': 'error',
        'curly': 'error',
        'default-case': 'error',
        'dot-location': [
            'error',
            'property'
        ],
        'dot-notation': 'error',
        'eol-last': [
            'error',
            'always'
        ],
        'eqeqeq': 'error',
        'for-direction': 'error',
        'func-call-spacing': [
            'error',
            'never'
        ],
        'func-name-matching': [
            'error',
            'always'
        ],
        'func-names': [
            'error',
            'as-needed'
        ],
        'func-style': [
            'error',
            'expression',
            {'allowArrowFunctions': true}
        ],
        'function-paren-newline': [
            'error',
            'never'
        ],
        'generator-star-spacing': [
            'error',
            {
                'after': false,
                'before': true
            }
        ],
        'global-require': 'off',
        'guard-for-in': 'error',
        'handle-callback-err': 'error',
        'id-blacklist': 'off',
        'id-length': 'off',
        'id-match': 'off',
        'indent': [
            'error',
            4,
            {'SwitchCase': 1}
        ],
        'init-declarations': [
            'error',
            'always'
        ],
        'jsx-quotes': [
            'error',
            'prefer-double'
        ],
        'key-spacing': [
            'error',
            {'mode': 'strict'}
        ],
        'keyword-spacing': [
            'error',
            {'after': true}
        ],
        'line-comment-position': [
            'error',
            {'position': 'above'}
        ],
        'linebreak-style': [
            'error',
            'unix'
        ],
        'lines-around-comment': [
            'error',
            {'beforeBlockComment': true}
        ],
        'max-depth': 'off',
        'max-len': 'off',
        'max-lines': 'off',
        'max-nested-callbacks': 'off',
        'max-params': 'off',
        'max-statements': 'off',
        'max-statements-per-line': [
            'error',
            {'max': 2}
        ],
        'multiline-ternary': 'off',
        'new-cap': 'error',
        'new-parens': 'error',
        'newline-per-chained-call': 'error',
        'no-alert': 'warn',
        'no-array-constructor': 'error',
        'no-await-in-loop': 'error',
        'no-bitwise': 'off',
        'no-buffer-constructor': 'error',
        'no-caller': 'error',
        'no-case-declarations': 'error',
        'no-catch-shadow': 'error',
        'no-class-assign': 'error',
        'no-compare-neg-zero': 'error',
        'no-cond-assign': 'error',
        'no-confusing-arrow': [
            'error',
            {'allowParens': true}
        ],
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-const-assign': 'error',
        'no-constant-condition': 'error',
        'no-continue': 'error',
        'no-control-regex': 'error',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-delete-var': 'error',
        'no-div-regex': 'error',
        'no-dupe-args': 'error',
        'no-dupe-class-members': 'error',
        'no-dupe-keys': 'error',
        'no-duplicate-case': 'error',
        'no-duplicate-imports': 'error',
        'no-else-return': 'error',
        'no-empty': 'error',
        'no-empty-character-class': 'error',
        'no-empty-function': [
            'error',
            {'allow': ['arrowFunctions']}
        ],
        'no-empty-pattern': 'error',
        'no-eq-null': 'error',
        'no-eval': 'error',
        'no-ex-assign': 'error',
        'no-extend-native': 'error',
        'no-extra-bind': 'error',
        'no-extra-boolean-cast': 'error',
        'no-extra-label': 'error',
        'no-extra-parens': [
            'error',
            'all',
            {'nestedBinaryExpressions': false}
        ],
        'no-extra-semi': 'error',
        'no-fallthrough': 'off',
        'no-floating-decimal': 'error',
        'no-func-assign': 'error',
        'no-global-assign': 'error',
        'no-implicit-coercion': 'error',
        'no-implicit-globals': 'error',
        'no-implied-eval': 'error',
        'no-inline-comments': 'error',
        'no-inner-declarations': 'error',
        'no-invalid-regexp': 'error',
        'no-invalid-this': 'off',
        'no-irregular-whitespace': 'error',
        'no-iterator': 'error',
        'no-label-var': 'error',
        'no-labels': 'error',
        'no-lone-blocks': 'error',
        'no-lonely-if': 'error',
        'no-loop-func': 'error',
        'no-magic-numbers': 'off',
        'no-mixed-operators': 'off',
        'no-mixed-requires': 'error',
        'no-mixed-spaces-and-tabs': 'error',
        'no-multi-assign': 'error',
        'no-multi-spaces': 'error',
        'no-multi-str': 'error',
        'no-multiple-empty-lines': 'error',
        'no-negated-condition': 'error',
        'no-nested-ternary': 'error',
        'no-new': 'error',
        'no-new-func': 'error',
        'no-new-object': 'error',
        'no-new-require': 'error',
        'no-new-symbol': 'error',
        'no-new-wrappers': 'error',
        'no-obj-calls': 'error',
        'no-octal': 'error',
        'no-octal-escape': 'error',
        'no-param-reassign': 'error',
        'no-path-concat': 'error',
        'no-plusplus': [
            'error',
            {'allowForLoopAfterthoughts': true}
        ],
        'no-process-env': 'off',
        'no-process-exit': 'error',
        'no-proto': 'error',
        'no-prototype-builtins': 'error',
        'no-redeclare': 'error',
        'no-regex-spaces': 'error',
        'no-restricted-globals': 'off',
        'no-restricted-imports': 'off',
        'no-restricted-modules': 'off',
        'no-restricted-properties': 'off',
        'no-restricted-syntax': 'off',
        'no-return-assign': 'error',
        'no-return-await': 'error',
        'no-script-url': 'error',
        'no-self-assign': 'error',
        'no-self-compare': 'error',
        'no-sequences': 'error',
        'no-shadow': 'warn',
        'no-shadow-restricted-names': 'error',
        'no-sparse-arrays': 'error',
        'no-sync': 'error',
        'no-tabs': 'error',
        'no-template-curly-in-string': 'error',
        'no-ternary': 'off',
        'no-this-before-super': 'error',
        'no-throw-literal': 'error',
        'no-trailing-spaces': 'error',
        'no-undef': 'error',
        'no-undef-init': 'error',
        'no-undefined': 'error',
        'no-underscore-dangle': 'off',
        'no-unexpected-multiline': 'error',
        'no-unmodified-loop-condition': 'error',
        'no-unneeded-ternary': 'error',
        'no-unreachable': 'error',
        'no-unsafe-finally': 'error',
        'no-unsafe-negation': 'error',
        'no-unused-expressions': [
            'error',
            {'allowTernary': true}
        ],
        'no-unused-labels': 'error',
        'no-unused-vars': 'error',
        'no-use-before-define': 'error',
        'no-useless-call': 'error',
        'no-useless-computed-key': 'error',
        'no-useless-concat': 'error',
        'no-useless-constructor': 'error',
        'no-useless-escape': 'error',
        'no-useless-rename': 'error',
        'no-useless-return': 'error',
        'no-var': 'error',
        'no-void': 'off',
        'no-warning-comments': 'off',
        'no-whitespace-before-property': 'error',
        'no-with': 'error',
        'nonblock-statement-body-position': 'off',
        'object-curly-newline': [
            'error',
            {
                'ObjectExpression': {
                    'minProperties': 2,
                    'multiline': true
                },
                'ObjectPattern': 'never'
            }
        ],
        'object-curly-spacing': [
            'error',
            'never'
        ],
        'object-property-newline': 'error',
        'object-shorthand': 'error',
        'one-var': [
            'error',
            'never'
        ],
        'one-var-declaration-per-line': [
            'error',
            'always'
        ],
        'operator-assignment': [
            'error',
            'always'
        ],
        'operator-linebreak': [
            'error',
            'before'
        ],
        'padded-blocks': 'off',
        'padding-line-between-statements': [
            'error',
            {
                'blankLine': 'always',
                'next': '*',
                'prev': [
                    'const',
                    'let',
                    'var'
                ]
            },
            {
                'blankLine': 'any',
                'next': [
                    'const',
                    'let',
                    'var'
                ],
                'prev': [
                    'const',
                    'let',
                    'var'
                ]
            }
        ],
        'prefer-arrow-callback': 'error',
        'prefer-const': 'error',
        'prefer-destructuring': [
            'error',
            {
                'array': true,
                'object': true
            },
            {'enforceForRenamedProperties': false}
        ],
        'prefer-numeric-literals': 'error',
        'prefer-promise-reject-errors': 'error',
        'prefer-rest-params': 'error',
        'prefer-spread': 'error',
        'prefer-template': 'error',
        'quote-props': [
            'error',
            'always'
        ],
        'quotes': [
            'error',
            'single'
        ],
        'radix': 'error',
        'require-await': 'error',
        'require-jsdoc': 'off',
        'require-yield': 'error',
        'rest-spread-spacing': [
            'error',
            'never'
        ],
        'semi': [
            'error',
            'always'
        ],
        'semi-spacing': [
            'error',
            {
                'after': true,
                'before': false
            }
        ],
        'semi-style': [
            'error',
            'last'
        ],
        'sort-imports': 'off',
        'sort-keys': 'off',
        'sort-vars': [
            'error',
            {'ignoreCase': true}
        ],
        'space-before-blocks': 'error',
        'space-before-function-paren': 'error',
        'space-in-parens': [
            'error',
            'never'
        ],
        'space-infix-ops': 'error',
        'space-unary-ops': 'error',
        'spaced-comment': [
            'error',
            'always'
        ],
        'strict': [
            'error',
            'safe'
        ],
        'switch-colon-spacing': 'error',
        'symbol-description': 'error',
        'template-curly-spacing': [
            'error',
            'never'
        ],
        'template-tag-spacing': [
            'error',
            'always'
        ],
        'unicode-bom': [
            'error',
            'never'
        ],
        'use-isnan': 'error',
        'valid-jsdoc': 'off',
        'valid-typeof': 'error',
        'vars-on-top': 'error',
        'wrap-iife': 'error',
        'wrap-regex': 'error',
        'yield-star-spacing': [
            'error',
            'before'
        ],
        'yoda': 'error'
    }
};
