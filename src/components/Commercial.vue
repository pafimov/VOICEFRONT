<template>
    <div class="modal fade show" tabindex="-1" role="dialog" style="position:fixed;
     display: block;z-index:100; background: rgba(0, 0, 0, .7); margin : auto">
        <div class="modal-dialog modal-dialog-centered" role="document" style="z-index: 2;">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Реклама</h5>
            </div>
            <div class="modal-body">
                <p>Commercial goes here.</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" data-dismiss="modal" @click="$emit('finished')">Close</button>
            </div>
            </div>
        </div>
        <div class="overlay"></div>
    </div>
</template>

<script>
export default{
    name : 'Commercial',

}

</script>