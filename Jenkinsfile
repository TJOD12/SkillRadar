pipeline {
    agent any

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
                        if (buildStatus == 0) {
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
        // stage('Cleanup') {
        //     steps {

        //     }
        // }
    }
}