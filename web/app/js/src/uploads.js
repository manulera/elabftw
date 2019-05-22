/**
 * uploads.js - for the uploaded files
 *
 * @author Nicolas CARPi <nicolas.carpi@curie.fr>
 * @copyright 2012 Nicolas CARPi
 * @see https://www.elabftw.net Official website
 * @license AGPL-3.0
 * @package elabftw
 */
(function() {
  'use strict';

  $(document).ready(function() {
    displayMolFiles(); // eslint-disable-line no-undef

    // REPLACE UPLOAD toggle form
    $(document).on('click', '.replaceUpload', function() {
      $(this).next('.replaceUploadForm').toggle();
    });

    // DESTROY UPLOAD
    $(document).on('click', '.uploadsDestroy', function() {
      var itemid = $(this).data('itemid');
      if (confirm($(this).data('msg'))) {
        $.post('app/controllers/EntityAjaxController.php', {
          uploadsDestroy: true,
          upload_id: $(this).data('id'),
          id: itemid,
          type: $(this).data('type')
        }).done(function(json) {
          notif(json);
          if (json.res) {
            $('#filesdiv').load('?mode=edit&id=' + itemid + ' #filesdiv', function() {
              makeEditableFileComment();
              displayMolFiles(); // eslint-disable-line no-undef
            });
          }
        });
      }
    });
  });
}());
