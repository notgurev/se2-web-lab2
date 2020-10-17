<%--suppress HtmlFormInputWithoutLabel --%>
<%@ page contentType="text/html;charset=UTF-8" %>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Первая лаба</title>
    <link href="resources/lebedev.png" rel="icon" type="image/png">
    <link href="styles.css" rel="stylesheet" type="text/css"/>
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
        <div class="content_block" id="inputs">
            <h1>Ввод параметров</h1>
            <form class="input_form" id="values_selection">
                <div id="x_input_block">
                    <div class="checkbox_block">
                        <label>X: </label>
                        <input name="x" type="checkbox" onclick="changeX(this)" value="-4"> -4
                        <input name="x" type="checkbox" onclick="changeX(this)" value="-3"> -3
                        <input name="x" type="checkbox" onclick="changeX(this)" value="-2"> -2
                        <input name="x" type="checkbox" onclick="changeX(this)" value="-1"> -1
                        <input name="x" type="checkbox" onclick="changeX(this)" value="0"> 0
                        <input name="x" type="checkbox" onclick="changeX(this)" value="1"> 1
                        <input name="x" type="checkbox" onclick="changeX(this)" value="2"> 2
                        <input name="x" type="checkbox" onclick="changeX(this)" value="3"> 3
                        <input name="x" type="checkbox" onclick="changeX(this)" value="4"> 4
                    </div>
                </div>
                <div id="y_input_block">
                    <label for="Y">Y:</label>
                    <input id="Y" maxlength="15" name="y"
                           onfocusout="this.reportValidity()" oninput='setCustomValidity(""); validateY(this)'
                           placeholder="(-5 ... 3)" type="text" value="">
                </div>
                <div id="r_input_block">
                    <div class="checkbox_block">
                        <label>R: </label>
                        <input name="r" type="checkbox" onclick="changeR(this)" value="1"> 1
                        <input name="r" type="checkbox" onclick="changeR(this)" value="2"> 2
                        <input name="r" type="checkbox" onclick="changeR(this)" value="3"> 3
                        <input name="r" type="checkbox" onclick="changeR(this)" value="4"> 4
                        <input name="r" type="checkbox" onclick="changeR(this)" value="5"> 5
                    </div>
                </div>
                <button class="special_button" disabled id="submit_button" type="submit">
                    Отправить
                </button>
                <button class="special_button special_black_button" id="clear_button" type="button">Очистить</button>
            </form>
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
<script src="main.js"></script>
</html>