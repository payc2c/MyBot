public class test {
    String v(String v){
        fillS(v);
        return v;
    }

    void fillS(String v){
        v = "name";
    }
    public static void main(String[] args) {
        test test = new test();
        System.out.println(test.v("not namte"));


    }
}
