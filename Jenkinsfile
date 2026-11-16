pipeline {
    agent any

    parameters {
        booleanParam(name: 'SuppressFrontend', defaultValue: false, description: 'Suppress Frontend build')
        booleanParam(name: 'SuppressBackend', defaultValue: false, description: 'Suppress Backend build')
        booleanParam(name: 'SuppressUT', defaultValue: true, description: 'Suppress UT stage')
        booleanParam(name: 'SuppressLint', defaultValue: true, description: 'Suppress Linting stage')
    }

    triggers {
        // Using Generic trigger plugin because the Github plugin didn't work
        GenericTrigger(
            causeString: 'Triggered by GitHub push',
            token: 'skillradar-token',
            printContributedVariables: true,
            printPostContent: true,
            genericVariables: [
                [
                    key: 'BRANCH',
                    value: '$.ref'
                ]
            ]
        )
    }

    tools {
        nodejs 'NodeJS-26'
    }

    stages {
        stage('Build') {
            steps {
                sh 'pwd'
                dir('frontend') {
                    script {
                        if (params.SuppressFrontend != true) {
                            def buildResult = sh(
                                script: '''
                                    npm ci
                                    npm run build
                                ''',
                                returnStatus: true
                            )
                            if (buildResult == 0) {
                                echo 'build successsful'
                            } else {
                                echo 'build failed'
                            }
                        }
                    }
                }
                dir('backend') {
                    script {
                        if (params.SuppressBackend != true) {
                            def buildResult = sh(
                                script: '''
                                    npm run build
                                ''',
                                returnStatus: true
                            )
                            if (buildResult == 0) {
                                echo 'build successsful'
                            } else {
                                echo 'build failed'
                            }
                        }
                    }
                }
            }
        }
        // stage('Unit Test') {
        //     steps {

        //     }
        // }
        stage('Linting') {
            steps {
                script {
                    if (params.SuppressLint != true) {
                        def lintingResult = sh(
                        script: '''
                            npm run lint
                        ''',
                        returnStatus: true
                        )
                        if (lintingResult == 0) {
                            echo 'linting successful'
                        } else {
                            echo 'linting failed'
                        }
                    }
                }
            }
        }
        // stage('Cleanup') {
        //     steps {

        //     }
        // }
    }
}