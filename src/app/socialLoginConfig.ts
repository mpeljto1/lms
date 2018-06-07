import { SocialLoginModule,AuthServiceConfig,GoogleLoginProvider } from "angular5-social-login";

export function getAuthServiceConfigs() {
    let config = new AuthServiceConfig([{
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider("76161238608-8vhnk5eubl4bfptvfj5le11164odnke7.apps.googleusercontent.com")
    }]);
    
    return config;
}