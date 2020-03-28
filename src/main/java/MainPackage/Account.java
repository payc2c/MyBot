package MainPackage;

import java.util.Objects;

public class Account {
    final private String email;
    final private String password;
    final private String login;
    private String randomLogin;
    private City city;
    private boolean hasError = false;

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
                email, password, String.valueOf(login), city != null ? String.valueOf(city.getName()) : "null", hasError);
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Account account = (Account) o;
        return email.equals(account.email) &&
                password.equals(account.password);
    }

    @Override
    public int hashCode() {
        return Objects.hash(email, password);
    }
}
