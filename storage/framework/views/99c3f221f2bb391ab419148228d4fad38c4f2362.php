<?php $__env->startSection('content'); ?>
<div id="mapDiv" style="height:100vh;"></div>
<?php $__env->stopSection(); ?>

<?php $__env->startSection('script'); ?>
<script src="https://maps.googleapis.com/maps/api/js"></script>
<script src="<?php echo e(asset('js/map.js')); ?>"></script>
<?php $__env->stopSection(); ?>

<?php echo $__env->make('layouts.app', array_except(get_defined_vars(), array('__data', '__path')))->render(); ?>