<?php
/**
 * @file
 * FLAT Gallery modal template.
 */
?>
<a href="#" data-role="flat-gallery-modal">Open Gallery</a>
<script type="text/template">
    <div class="flat-gallery-modal" data-role="flat-gallery-modal-container">
        <div class="flat-gallery-modal-overlay"></div>
        <div class="flat-gallery-modal-content-container">
            <a href="#" class="flat-gallery-modal-close" data-role="flat-gallery-modal-close"></a>
            <div class="flat-gallery-modal-content" data-role="flat-gallery-modal-content">
                <iframe allowfullscreen="true" allow="fullscreen" src="<?php echo $url; ?>"></iframe>
            </div>
        </div>
    </div>
</script>
