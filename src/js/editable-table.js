var EditableTable = function (target) {

    return {

        //main function to initiate the module
        init: function () {
            function restoreRow(oTable, nRow) {
                var aData = oTable.fnGetData(nRow);
                var jqTds = jQuery('>td', nRow);

                for (var i = 0, iLen = jqTds.length; i < iLen; i++) {
                    oTable.fnUpdate(aData[i], nRow, i, false);
                }

                oTable.fnDraw();
            }

            function editRow(oTable, nRow) {
                jQuery(nRow).addClass('editing');
                var aData = oTable.fnGetData(nRow);
                var jqTds = jQuery('>td', nRow);
                var jqThs= jQuery('thead th',target);
                jqTds.each(function(name,value,entry){
                    if(jqThs.eq(name).hasClass('editale-property')){
                        jqTds[name].innerHTML='<input type="text" class="form-control small" value="' + aData[name] + '">';
                    }
                    
                });
            }

            function saveRow(oTable, nRow) {
                var jqInputs = jQuery('>input', nRow);
                var jqTds=jQuery('>td',nRow);
                jqInputs.each(function(name,value,entry){
                    var index=jqInputs.eq(name).parent().index();
                    oTable.fnUpdate(jqInputs[name].value,nRow,index,false);
                });
                // oTable.fnUpdate('<a class="edit" href="">编辑</a> <a class="cancel" href="">删除</a>', nRow, 7, false);
                oTable.fnDraw();
            }

            function cancelEditRow(oTable, nRow) {
                var aData = oTable.fnGetData(nRow);
                nRow=jQuery(nRow);
                if(nRow.hasClass('editing')){
                    restoreRow(oTable,nRow.get(0));
                    nRow.removeClass('editing');
                }
            }

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
                    }
                ]
            });

            jQuery('#editable-sample_wrapper .dataTables_filter input').addClass("form-control medium"); // modify table search input
            jQuery('#editable-sample_wrapper .dataTables_length select').addClass("form-control xsmall"); // modify table per page dropdown

            var nEditing = null;

            jQuery('#editable-sample_new').click(function (e) {
                e.preventDefault();
                // var 
                var aiNew = oTable.fnAddData(['', '', '', '','','','',
                        jQuery('th.action',target).attr('x-value')
                ]);
                var nRow = oTable.fnGetNodes(aiNew[0]);
                editRow(oTable, nRow);
                nEditing = nRow;
            });

            jQuery('a.delete',target).live('click', function (e) {
                e.preventDefault();

                if (confirm("Are you sure to delete this row ?") == false) {
                    return;
                }

                var nRow = jQuery(this).parents('tr')[0];
                oTable.fnDeleteRow(nRow);
                alert("Deleted! Do not forget to do some ajax to sync with backend :)");
            });

            jQuery('a.cancel',target).live('click', function (e) {
                e.preventDefault();
                // if (jQuery(this).attr("data-mode") == "new") {
                //     var nRow = jQuery(this).parents('tr')[0];
                //     oTable.fnDeleteRow(nRow);
                // } else {
                //     restoreRow(oTable, nEditing);
                //     nEditing = null;
                // }
                var nRow = jQuery(this).parents('tr')[0];
                cancelEditRow(oTable,nRow);
            });

            jQuery('a.edit',target).live('click', function (e) {
                e.preventDefault();

                /* Get the row as a parent of the link that was clicked on */
                var nRow = jQuery(this).parents('tr')[0];
                if (nEditing !== null && nEditing != nRow) {
                    /* Currently editing - but not this row - restore the old before continuing to edit mode */
                    restoreRow(oTable, nEditing);
                    editRow(oTable, nRow);
                    nEditing = nRow;
                } else if (nEditing == nRow && this.innerHTML == "Save") {
                    /* Editing this row and want to save it */
                    saveRow(oTable, nEditing);
                    nEditing = null;
                    alert("Updated! Do not forget to do some ajax to sync with backend :)");
                } else {
                    /* No edit in progress - let's start one */
                    editRow(oTable, nRow);
                    nEditing = nRow;
                }
            });
            jQuery('a.save',target).on('click',function(e){
                e.preventDefault();
                var aData = oTable.fnGetData(nRow);
                var jqTds = jQuery('td', nRow);
                var nRow=$(this).closest('tr').get(0);
                var jqThs= jQuery('thead th',target);
                console.log(jqThs,jqTds);
                jqTds.each(function(name,value,entry){
                    if(jqThs.eq(name).hasClass('editale-property')){
                        oTable.fnUpdate(jqTds.eq(name).find('input').val(),nRow,name,false)
                    }
                });

                oTable.fnDraw();
            })
        }

    };

};