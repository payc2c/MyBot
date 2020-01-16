package MainPackage;

public class Account {
    final private String email;
    final private String password;
    final private String login;
    private String randomLogin;

    public String getRandomLogin() {
        return randomLogin;
    }

    public void setRandomLogin() {
        this.randomLogin = Helpers.randomiseLogin(login);
    }

    public Account(String email, String password, String login) {
        this.email = email;
        this.password = password;
        this.login = login;
        this.randomLogin = Helpers.randomiseLogin(login);
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public String getLogin() {
        return login;
    }

    public boolean isNull() {
        return email == null || password == null || login == null;
    }

    public boolean isNotNull() {
        return !isNull();
    }
}
