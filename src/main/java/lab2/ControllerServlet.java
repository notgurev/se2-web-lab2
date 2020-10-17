package lab2;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class ControllerServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.getRequestDispatcher("index.jsp").forward(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        // проверка наличия всех параметров
        if (req.getParameter("x") != null && req.getParameter("y") != null && req.getParameter("r") != null) {
            // отправляем на проверку
            req.getRequestDispatcher("/areaCheck").forward(req, resp);
        } else {
            // отправляем обратно с сообщением про ошибку
            req.setAttribute("message", "Ошибка: отсутствуют необходимые параметры!");
            req.getRequestDispatcher("index.jsp").forward(req, resp);
        }

    }
}
