package lab2;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class AreaCheckServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        // тут вычисления проверки и так далее
        req.getRequestDispatcher("results.jsp").forward(req, resp); // todo почему-то отображается как lab2/controller...
    }
}
