<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Первая лаба</title>
    <link href="resources/lebedev.png" rel="icon" type="image/png">
    <link href="styles.css" rel="stylesheet" type="text/css"/>
    <style>
        .content_block#get_back_button_block {
            min-height: 0;
            max-height: none;
            padding-top: 50px;
            padding-bottom: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            height: fit-content;
        }
    </style>
</head>
<header>
    <div id="header_text">
        Лабораторная работа №2, Кириенко™ Никита™ Алексеевич™, группа P3212, вариант 3161
    </div>
</header>
<body>
<div class="content">
    <h1>Проверка попадания точки в выделенную площадь</h1>
    <div id="content_blocks">
        <div class="content_block" id="graph-picture"></div>
        <div class="content_block" id="get_back_button_block">
            <button class="special_button" onclick="location.href='${pageContext.request.contextPath}/controller'">Вернуться на главную</button>
        </div>
        <div class="content_block" id="results">
            <table id="results_table">
                <thead>
                <tr>
                    <th>X</th>
                    <th>Y</th>
                    <th>R</th>
                    <th>Результат</th>
                </tr>
                </thead>
                <tbody>
                    <!-- вывести в цикле -->
                </tbody>
            </table>
        </div>
    </div>
</div>
</body>
<footer>
    <div id="footer_text">
        Санкт-Петербург <br>
        Сентябрь, 2020
    </div>
</footer>
</html>