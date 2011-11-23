resourceService 'Photographers', 'photographers/:photographer_id', 'index'
resourceService 'Galleries', 'photographers/:photographer_id/galleries/:gallery_id', 'index'
resourceService 'Photos', 'photographers/:photographer_id/galleries/:gallery_id/photos', 'index'
resourceService 'SelectedPhotos', 'selected_photos/:selected_photo_id'
