<template>
    <div :class="type" class="alert text-center mt-2">
        <slot name="message"></slot>

    </div>
</template>

<script>

export default {
    props: {
        type: {
            type: String,
            required: true
        }
    },


}
</script>

<style>

</style>