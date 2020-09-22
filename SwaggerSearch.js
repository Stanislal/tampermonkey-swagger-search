(function () {

    addGlobalStyle("#customModal{overflow-x:hidden;top:50px;background:#fff;z-index:99;box-shadow:0 1px 2px 0 rgba(0,0,0,.15) max-height: 300px;position:absolute;width:400px;}#customSearchTerm:focus{box-shadow:0 0;border:0 none;outline:0}#customSearchTerm{width:100%}.download-url-wrapper{order:2}.topbar-wrapper .link{min-width:150px}#searchContainer{width:400px;top:0;margin:auto;order:1}#customModal a{text-decoration:none;max-width:unset;color:#55a;font-weight:500}li.list-group-item{padding:5px}li.list-group-item:hover{background:#89bf04b0}.list-group{display:flex;flex-direction:column;padding-left:0;margin:0}");

    function addGlobalStyle(css) {
        var head, style;
        head = document.getElementsByTagName('head')[0];
        if (!head) {
            return;
        }
        style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = css;
        head.appendChild(style);
    }

    addGlobalStyle("#customModal{overflow-x:hidden;top:50px;background:#fff;z-index:99;box-shadow:0 1px 2px 0 rgba(0,0,0,.15) max-height: 300px;position:absolute;width:400px;}#customSearchTerm:focus{box-shadow:0 0;border:0 none;outline:0}#customSearchTerm{width:100%}.download-url-wrapper{order:2}.topbar-wrapper .link{min-width:150px}#searchContainer{width:400px;top:0;margin:auto;order:1}#customModal a{text-decoration:none;max-width:unset;color:#55a;font-weight:500}li.list-group-item{padding:5px}li.list-group-item:hover{background:#89bf04b0}.list-group{display:flex;flex-direction:column;padding-left:0;margin:0}");

    function addGlobalStyle(css) {
        var head, style;
        head = document.getElementsByTagName('head')[0];
        if (!head) {
            return;
        }
        style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = css;
        head.appendChild(style);
    }

    'use strict';

    var swaggerList = new Array();

    function SwaggerDTO(id, name, url) {
        this.id = id;
        this.name = name;
        this.searchName = name.toLowerCase();
        this.url = url;
        this.redirectURL = window.location.origin + window.location.pathname + "?urls.primaryName=" + name;
    }

    function search(param) {
        var filtredSwaggerList = swaggerList.filter(swagger => swagger.searchName.search(param.toLowerCase()) > -1);
        console.log(filtredSwaggerList);
        $("#customModalId").html("");

        filtredSwaggerList.forEach(swagger => {
            $("#customModalId").append("<li class=\"list-group-item\"><a href=\"" + swagger.redirectURL + "\">" + swagger.name + "</a></li>");
        });

    }

    function createHTML() {
        $().add("<div><\div>")
            .attr("id", "searchContainer")
            .prependTo(".topbar-wrapper");

        $().add("<input type='text' value='' />")
            .attr("id", "customSearchTerm")
            .attr("name", "customSearchTerm")
            .attr("placeholder", "Buscar swagger")
            .prependTo("#searchContainer");


        $("#searchContainer").append("<div id=\"customModal\"></div>");

        $("#customModal").append("<ul id=\"customModalId\" class=\"list-group\"></ul>");
        $("#customModal").css({
            "max-height": "300px"
        });
        $("#customModalId").css({
            'display': 'flex',
            'flex-direction': 'column',
            'padding-left': '0',
            'margin': '0'
        });
    }

    function createBinds() {

        $(".swagger-ui").on("click", event => {
            try {
                $("#customModalId").html("");
            } catch (e) {
                console.log(e);
            }
        });

        $(window).on("resize", event => {
            try {
                $("#customModal").css("width", $("#searchContainer").width() + "px");
            } catch (e) {
                console.log(e);
            }
        });

        $("#customSearchTerm").on('keyup', event => {

            if (event.target.value && event.target.value.length > 2)
                search(event.target.value);
            else
                $("#customModalId").html("");
        });

    }

    $(document).ready(function () {
        console.log("Swagger Search loaded...");

        var intervalEvent = setInterval(onLoad, 350);

        function onLoad() {
            try {
                if ($('#select').find('option').length > 0) {
                    var defaultSwaggerList = $('#select').find('option');
                    $.each(defaultSwaggerList, (idx, elm) => {
                        swaggerList.push(new SwaggerDTO(elm.index, elm.label, elm.value));
                    });

                    createHTML();
                    createBinds();
                    clearInterval(intervalEvent);
                }

            } catch (e) {
                console.log(e);
            }

        }

    })



})();