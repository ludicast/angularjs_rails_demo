(function() {
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  this.PhotoGalleryCtrl = (function() {

    __extends(PhotoGalleryCtrl, Router);

    function PhotoGalleryCtrl() {
      PhotoGalleryCtrl.__super__.constructor.apply(this, arguments);
    }

    PhotoGalleryCtrl.prototype.routes = function() {
      return {
        "default": '/photographers',
        '/photographers': {
          template: '/assets/photographers.html',
          controller: PhotographersCtrl
        },
        '/photographers/:photographer_id/galleries': {
          template: '/assets/galleries.html',
          controller: GalleriesCtrl
        },
        '/photographers/:photographer_id/galleries/:gallery_id/photos': {
          template: '/assets/photos.html',
          controller: PhotosCtrl
        }
      };
    };

    return PhotoGalleryCtrl;

  })();

  PhotoGalleryCtrl.$inject = ['$route', '$xhr'];

  this.PhotographersCtrl = (function() {

    function PhotographersCtrl(Photographers) {
      this.Photographers = Photographers;
      this.photographers = this.Photographers.index();
    }

    return PhotographersCtrl;

  })();

  PhotographersCtrl.$inject = ['Photographers'];

  this.GalleriesCtrl = (function() {

    function GalleriesCtrl(Galleries, Photographers, $routeParams) {
      this.photographer = Photographers.get({
        photographer_id: $routeParams.photographer_id
      });
      this.galleries = Galleries.index({
        photographer_id: $routeParams.photographer_id
      });
    }

    return GalleriesCtrl;

  })();

  GalleriesCtrl.$inject = ['Galleries', 'Photographers', '$routeParams'];

  this.PhotosCtrl = (function() {

    function PhotosCtrl(Photos, Galleries, Photographers, SelectedPhotos, $routeParams) {
      this.SelectedPhotos = SelectedPhotos;
      this.photographer = Photographers.get({
        photographer_id: $routeParams.photographer_id
      });
      this.gallery = Galleries.get({
        photographer_id: $routeParams.photographer_id,
        gallery_id: $routeParams.gallery_id
      });
      this.photos = Photos.index({
        photographer_id: $routeParams.photographer_id,
        gallery_id: $routeParams.gallery_id
      });
      this.selected_photos = SelectedPhotos.index();
    }

    PhotosCtrl.prototype.selectPhoto = function(photo) {
      var selected_photo;
      var _this = this;
      selected_photo = new this.SelectedPhotos({
        selected_photo: {
          photo_id: photo.id
        }
      });
      return selected_photo.$create(function() {
        return _this.selected_photos.push(selected_photo);
      });
    };

    PhotosCtrl.prototype.deleteSelectedPhoto = function(selected_photo) {
      angular.Array.remove(this.selected_photos, selected_photo);
      return selected_photo.$destroy({
        selected_photo_id: selected_photo.id
      });
    };

    PhotosCtrl.prototype.saveSelectedPhoto = function(selected_photo) {
      selected_photo.$update({
        selected_photo_id: selected_photo.id
      });
      return $('input').blur();
    };

    return PhotosCtrl;

  })();

  PhotosCtrl.$inject = ['Photos', 'Galleries', 'Photographers', 'SelectedPhotos', '$routeParams'];

}).call(this);

