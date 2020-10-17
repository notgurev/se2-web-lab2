package lab2.beans;

public class Result {
    private float x;
    private float y;
    private float radius;
    private boolean successful;

    public Result(float x, float y, float radius, boolean successful) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.successful = successful;
    }

    public float getX() {
        return x;
    }

    public void setX(float x) {
        this.x = x;
    }

    public float getY() {
        return y;
    }

    public void setY(float y) {
        this.y = y;
    }

    public float getRadius() {
        return radius;
    }

    public void setRadius(float radius) {
        this.radius = radius;
    }

    public boolean isSuccessful() {
        return successful;
    }

    public void setSuccessful(boolean successful) {
        this.successful = successful;
    }
}
