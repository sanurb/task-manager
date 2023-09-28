export class AuthModel {
  token: string;
  user: {
    id: number;
    username: string;
    email: string;
    last_login: Date;
    enabled: boolean;
    authorities: {
      authority: string;
    }[];
    accountNonLocked: boolean;
    credentialsNonExpired: boolean;
    accountNonExpired: boolean;
  };

  setAuth(auth: AuthModel) {
    this.token = auth.token;
    this.user = auth.user;
  }
}
