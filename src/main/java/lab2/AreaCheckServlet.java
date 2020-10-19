package lab2;

import lab2.beans.Result;
import lab2.beans.ResultsBean;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static java.lang.Math.pow;
import static java.lang.String.format;

@SuppressWarnings("FieldCanBeLocal")
public class AreaCheckServlet extends HttpServlet {
    private final List<Integer> ALLOWED_X = new ArrayList<>(Arrays.asList(-4, -3, -2, -1, 0, 1, 2, 3, 4));
    private final List<Integer> ALLOWED_R = new ArrayList<>(Arrays.asList(1, 2, 3, 4, 5));
    private final int MIN_Y = -3;
    private final int MAX_Y = 5;

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        try {
            ResultsBean resultsBean = (ResultsBean) req.getSession().getAttribute("results");
            checkAndAddResults(resultsBean, req.getParameter("x"), req.getParameter("y"), req.getParameter("r"));
            req.getSession().setAttribute("results", resultsBean);
            req.getRequestDispatcher("results.jsp").forward(req, resp);
        } catch (IllegalArgumentException | NullPointerException e) {
            resp.setStatus(400);
            req.setAttribute("message", "Ошибка: " + e.getMessage());
            req.getRequestDispatcher("index.jsp").forward(req, resp);
        }
    }

    private void checkAndAddResults(ResultsBean resultsBean, String xValue, String yValue, String rValue) throws IllegalArgumentException {
        String xExceptionMessage = format("X должен иметь одно из следующих значений: %s", ALLOWED_X);
        String yExceptionMessage = format("Y должен находиться в диапазоне (%d...%d)", MIN_Y, MAX_Y);
        String rExceptionMessage = format("R должен иметь одно из следующих значений: %s", ALLOWED_R);

        int x = parseInteger(xValue, xExceptionMessage);
        float y = parseFloat(yValue, yExceptionMessage);
        int r = parseInteger(rValue, rExceptionMessage);

        if (!ALLOWED_X.contains(x)) throw new IllegalArgumentException(xExceptionMessage);
        if (y < MIN_Y || y > MAX_Y) throw new IllegalArgumentException(yExceptionMessage);
        if (!ALLOWED_R.contains(r)) throw new IllegalArgumentException(rExceptionMessage);

        resultsBean.getResults().addFirst(new Result(x, y, r, checkArea(x, y, r)));
    }

    private Integer parseInteger(String arg, String messageIfFailed) throws NumberFormatException {
        try {
            return Integer.parseInt(arg);
        } catch (NumberFormatException e) {
            throw new NumberFormatException(messageIfFailed);
        }
    }

    private Float parseFloat(String arg, String messageIfFailed) throws NumberFormatException {
        try {
            return Float.parseFloat(arg);
        } catch (NumberFormatException e) {
            throw new NumberFormatException(messageIfFailed);
        }
    }

    private boolean checkArea(int x, float y, int R) {
        if (x >= 0) {
            if (y >= 0) {
                // Четверть круга
                return pow(x, 2) + pow(y, 2) <= pow((float) R / 2, 2);
            } else {
                // ничего
                return false;
            }
        } else {
            if (y >= 0) {
                // треугольник, под прямой y=x/2+R/2
                return y < (float) x / 2 + (float) R / 2;
            } else {
                //  прямоугольник
                return x >= -R / 2 && y >= R;
            }
        }
    }
}
