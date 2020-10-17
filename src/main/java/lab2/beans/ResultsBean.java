package lab2.beans;

import java.io.Serializable;
import java.util.ArrayDeque;
import java.util.Deque;

public class ResultsBean implements Serializable {
    private Deque<Result> results = new ArrayDeque<>();

    public Deque<Result> getResults() {
        return results;
    }

    public void setResults(Deque<Result> results) {
        this.results = results;
    }
}
