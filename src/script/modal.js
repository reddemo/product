var olderModal=jQuery.fn.modal;
function newModal(data){
		jQuery('.modal-title',this).html(data.title||"警告");
		jQuery('.modal-body',this).html(data.body||"警告");
		olderModal.call($(this));
}
jQuery.fn.extend({
	'modal':newModal
})