pipeline {
    agent any

    parameters {
        booleanParam(name: 'SuppressUT', defaultValue: true, description: 'Suppress UT stage')
        booleanParam(name: 'SuppressLint', defaultValue: true, description: 'Suppress Linting stage')
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
                dir('backend') {
                    script {
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