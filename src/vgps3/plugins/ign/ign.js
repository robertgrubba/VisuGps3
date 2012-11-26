/**
 * Copyright 2012 Victor Berchet
 *
 * This file is part of VisuGps3
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 *
 */

/**
 * @fileoverview
 * @author Victor Berchet <victor@suumit.com>
 */

goog.provide('vgps3.ign.Map');

goog.require('vgps3.IPlugin');
goog.require('vgps3.Map');


/**
 * @constructor French IGN map type for google maps.
 * @implements {vgps3.IPlugin}
 */
vgps3.ign.Map = function() {};


/**
 * Registers this map type in google maps.
 *
 * @override
 */
vgps3.ign.Map.prototype.init = function(vgps) {
  var gMap = vgps.getGoogleMap();
  gMap.mapTypes.set(vgps3.ign.MapTypeId.TERRAIN, /** @type {?} */ (this.getIgnMapType_()));
};


/**
 * @return {google.maps.ImageMapType} The IGN map type
 * @private
 */
vgps3.ign.Map.prototype.getIgnMapType_ = function() {
  return new google.maps.ImageMapType({
    getTileUrl: function(coord, zoom) {
      var numTiles = 1 << zoom;
      if (coord.y < 0 || coord.y >= numTiles) {
        return null;
      }
      return vgps3.ign.TILES_URL
                .replace('{zoom}', zoom)
                .replace('{x}', (((coord.x % numTiles) + numTiles) % numTiles).toString(10))
                .replace('{y}', coord.y)
                .replace('{layer}', 'GEOGRAPHICALGRIDSYSTEMS.MAPS');

    },
    tileSize: new google.maps.Size(256, 256),
    minZoom: 6,
    maxZoom: 17,
    name: 'IGN',
    alt: 'Cartes IGN France'
  });
};


/**
 * @define {string} The API key
 */
vgps3.ign.API_KEY = 'tyujsdxmzox31ituc2uw0qwl';


/**
 * @define {string} The url for tiles
 */
vgps3.ign.TILES_URL = 'http://gpp3-wxs.ign.fr/' + vgps3.ign.API_KEY + '/wmts?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetTile&LAYER={layer}&STYLE=normal&FORMAT=image/jpeg&TILEMATRIXSET=PM&TILEMATRIX={zoom}&TILEROW={y}&TILECOL={x};';

/**
 * @enum {string} The supported map types
 */
vgps3.ign.MapTypeId = {
  TERRAIN: 'vgps3-ign-terrain'
};

goog.exportSymbol('vgps3.ign.Map', vgps3.ign.Map);
goog.exportSymbol('vgps3.ign.Map.init', vgps3.ign.Map.prototype.init);
