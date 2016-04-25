var EditableTable = function(options) {

    return {

        //main function to initiate the module
        init: function() {
            function restoreRow(oTable, nRow) {
                var aData = oTable.fnGetData(nRow);
                var jqTds = jQuery('>td', nRow);

                for (var i = 0, iLen = jqTds.length; i < iLen; i++) {
                    oTable.fnUpdate(aData[i], nRow, i, false);
                }

                oTable.fnDraw();
            }

            function editRow(oTable, nRow) {
                var jqRow = jQuery(nRow);
                var aData = oTable.fnGetData(nRow);
                var jqTds = jQuery('>td', nRow);


                jqRow.addClass('editing');
                jqTds.each(function(name, value, entry) {
                    if (jqThs.eq(name).hasClass('editale-property')) {
                        jqTds[name].innerHTML = '<input type="text" name="' + jqThs.eq(name).attr('x-name') + '" class="form-control small" value="' + aData[name] + '">';
                    }

                });
            }

            function saveRow(oTable, nRow) {
                var jqInputs = jQuery('>input', nRow);
                var jqTds = jQuery('>td', nRow);
                jqInputs.each(function(name, value, entry) {
                    var index = jqInputs.eq(name).parent().index();
                    oTable.fnUpdate(jqInputs[name].value, nRow, index, false);
                });
                // oTable.fnUpdate('<a class="edit" href="">编辑</a> <a class="cancel" href="">删除</a>', nRow, 7, false);
                oTable.fnDraw();
            }

            function cancelEditRow(oTable, nRow) {
                var aData = oTable.fnGetData(nRow);
                var jqRow = jQuery(nRow);
                if (jqRow.hasClass('editing')) {
                    restoreRow(oTable, jqRow.get(0));
                    jqRow.removeClass('editing');
                }
            }

            var jqWrapper = options.jqWrapper;
            var target = jQuery('.only-editable-table', jqWrapper);

            var oTable = target.dataTable({
                "aLengthMenu": [
                    [5, 15, 20, -1],
                    [5, 15, 20, "All"] // change per page values here
                ],
                // set the initial value
                "iDisplayLength": 8,
                "sDom": "<'row'<'col-lg-6'l><'col-lg-6'f>r>t<'row'<'col-lg-6'i><'col-lg-6'p>>",
                "sPaginationType": "bootstrap",
                "oLanguage": {
                    "sLengthMenu": "_MENU_ records per page",
                    "oPaginate": {
                        "sPrevious": "Prev",
                        "sNext": "Next"
                    }
                },
                "aoColumnDefs": [{
                    'bSortable': false,
                    'aTargets': [0]
                }]
            });

            var jqThs = jQuery('>thead>tr>th', target.get(0));

            jQuery('.dataTables_filter input', jqWrapper).addClass("form-control medium"); // modify table search input
            jQuery('.dataTables_length select', jqWrapper).addClass("form-control xsmall"); // modify table per page dropdown

            var nEditing = null;

            jqWrapper.on('click', '.editable-table-adder', function(e) {
                e.preventDefault();
                if (nEditing != null) {
                    alert('开始新的任务前请先结束当前任务!');
                    return;
                }
                var aValue = jqThs.map(function(name, value, entry) {
                    return jQuery(value).attr('x-value');
                });

                var aiNew = oTable.fnAddData(aValue);
                var nRow = oTable.fnGetNodes(aiNew[0]);
                editRow(oTable, nRow);
                nEditing = nRow;
            });

            jqWrapper.on('click', '.only-editable-table .delete', function(e) {
                e.preventDefault();

                var nRow = jQuery(this).parents('tr')[0];
                if (nEditing != null && nEditing != nRow) {
                    alert('开始新的任务前请先结束当前任务，谢谢!');
                    return;
                }

                if (confirm("确认要删掉这行数据吗") == false) {
                    return;
                }

                oTable.fnDeleteRow(nRow);
                nEditing = null;
                alert("数据已删除!");
            });

            jqWrapper.on('click', '.only-editable-table .cancel', function(e) {
                e.preventDefault();
                var nRow = jQuery(this).parents('tr')[0];
                if (nRow != nEditing) return;
                cancelEditRow(oTable, nRow);
                nEditing = null;
            });

            jqWrapper.on('click', '.only-editable-table .edit', function(e) {
                e.preventDefault();

                /* Get the row as a parent of the link that was clicked on */
                var nRow = jQuery(this).parents('tr')[0];

                if (nEditing === null) {
                    editRow(oTable, nRow);
                    nEditing = nRow; //正在处理该行;
                } else if (nEditing !== null && nEditing != nRow) {
                    /* Currently editing - but not this row - restore the old before continuing to edit mode */
                    alert('开始新的任务前请先结束当前任务!');
                }

            });
            jqWrapper.on('click', '.only-editable-table .save', function(e) {
                e.preventDefault();

                var nRow = $(this).closest('tr').get(0);
                if (nRow != nEditing) return;
                var spin=new Spin('loading-container');
                spin.show();
                http.savePrize({
                    data:target.closest('form').serialize()
                })
                    .then(function(res) {
                        spin.hide();
                        if (res.code == 0) {
                            var jqTds = jQuery('td', nRow);
                            var jqThs = jQuery('thead th', target);
                            jqTds.each(function(name, value, entry) {
                                if (jqThs.eq(name).hasClass('editale-property')) {
                                    oTable.fnUpdate(jqTds.eq(name).find('input').val(), nRow, name, false);
                                }
                            });

                            oTable.fnDraw();
                            nEditing = null;
                        }else{
                            $("#bang-alert").modal({
                                title:'发生了错误',
                                body:res.error
                            });
                        }
                    })['catch'](function(res){
                        spin.hide();
                        $("#bang-alert").modal({
                                title:'发生了错误',
                                body:res.error
                            });
                    });
            });
        }

    };

};
