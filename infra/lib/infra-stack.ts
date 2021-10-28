import * as cdk from "@aws-cdk/core";
import * as amplify from "@aws-cdk/aws-amplify";
import * as ssm from "@aws-cdk/aws-ssm";
import { SecretValue } from "@aws-cdk/core";

export class AmplifyInfraStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const githubkey : SecretValue =  cdk.SecretValue.ssmSecure('projectkey', '1');
   
    // Part 2 - Creation of the Amplify Application
    const amplifyApp = new amplify.App(this, "sample-react-app ", {
      sourceCodeProvider: new amplify.GitHubSourceCodeProvider({
        owner: "anitachandlermohan",
        repository: "topsecretproject",
        oauthToken: githubkey,
      }),
    });
    const masterBranch = amplifyApp.addBranch("master");
  }
}