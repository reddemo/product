<div class="city-box">
    <ul class="city-list">
        <li class="act"><a href="javascript:;">所有城市</a></li>
        <%_.each(_.rest(table),function(city,k,e){%>
            <li class="">
                <a href="javascript:;">
                    <%=city.name%>
                </a>
            </li>
        <%});%>
    </ul>
    <div class="job-all">
        <!--所有城市-->
        <!--城市-->
        <%_.each(_.rest(table),function(city,k,e){%>
            <div class="city-all">
                <!-- 部门 -->
                <%_.each(_.rest(city.children),function(department,k,e){%>
                    <div class="job-info clearfix">
                        <h3><%=department.name%></h3>
                        <ul>
                            <!-- 岗位名称 -->
                            <%_.each(_.rest(department.children),function(job,k,e){%>
                                <li>
                                    <a href="javascript:;">
                                        <%=job.name%>
                                    </a>
                                </li>
                            <%})%>
                        </ul>
                        <div class="big-wrap">
                            <%_.each(_.rest(department.children),function(job,k,e){%>
                                <!-- 岗位描述 -->
                                <div class="job-box" style="display: none;">
                                    <h4><%=job.children[0].name%></h4>
                                    <%_.each(splitExpression(job.children[0].children[0].name),function(expression,k,e){%>
                                        <p><%=expression%></p>
                                    <%})%>
                                    <h4><%=job.children[1].name%></h4>
                                    <%_.each(splitExpression(job.children[1].children[0].name),function(expression,k,e){%>
                                        <p><%=expression%></p>
                                    <%})%>
                                </div>
                            <%})%>
                        </div>
                    </div>
                <%})%>
            </div>
        <%});%>
    </div>
</div>
