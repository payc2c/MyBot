package MainPackage;

public class Account {
    final private String email;
    final private String password;
    final private String login;
    private String randomLogin;
    private City city;
    private boolean hasError;

    public String getRandomLogin() {
        return randomLogin;
    }

    public void setRandomLogin() {
        this.randomLogin = Helpers.randomiseLogin(login);
    }

    public Account(String email, String password) {
        this.email = email;
        this.password = password;
        this.login = null;
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

    @Override
    public String toString() {
        return String.format("Email: %s, Password: %s, Login: %s, City: %s, Banned: %s",
                email, password, String.valueOf(login), String.valueOf(city.getName()), hasError);
    }

    public City getCity() {
        return city;
    }

    public Account setCity(City city) {
        this.city = city;
        return this;
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

    public boolean hasError() {
        return hasError;
    }

    public Account setHasError(boolean hasError) {
        this.hasError = hasError;
        return this;
    }
}
