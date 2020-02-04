package MainPackage;

public final class City {
    private String name;

    private String code;
    private String anotherCode;
    public City(String name, String code, String anotherCode) {
        this.name = name;
        this.code = code;
        this.anotherCode = anotherCode;
    }

    public String getName() {
        return name;
    }

    public String getCode() {
        return code;
    }

    public String getAnotherCode() {
        return anotherCode;
    }
}
