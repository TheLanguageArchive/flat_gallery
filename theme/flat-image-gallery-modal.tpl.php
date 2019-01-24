<?php
/**
 * @file
 * Islandora SP Image Gallery modal template.
 */
?>
<a href="#" data-role="flat-image-gallery-modal">Image Gallery</a>
<script type="text/template">
    <div class="flat-image-gallery-modal" data-role="flat-image-gallery-modal-container">
        <div class="flat-image-gallery-modal-overlay"></div>
        <div class="flat-image-gallery-modal-content-container">
            <a href="#" class="flat-image-gallery-modal-close" data-role="flat-image-gallery-modal-close"></a>
            <div class="flat-image-gallery-modal-content" data-role="flat-image-gallery-modal-content">
                <iframe src="<?php echo $url; ?>"></iframe>
            </div>
        </div>
    </div>
</script>
