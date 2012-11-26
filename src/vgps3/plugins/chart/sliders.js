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
 * @fileoverview A set of sliders.
 * @author Victor Berchet <victor@suumit.com>
 */

goog.provide('vgps3.chart.Sliders');

goog.require('goog.dom');
goog.require('goog.style');
goog.require('goog.ui.Component');
goog.require('goog.ui.Slider');



/**
 *
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
 * @constructor
 * @extends {goog.ui.Component}
 */
vgps3.chart.Sliders = function(opt_domHelper) {
  /**
  * @type {Element} The title div.
  * @private
  */
  this.title_;

  goog.base(this, opt_domHelper);
};
goog.inherits(vgps3.chart.Sliders, goog.ui.Component);


/**
 * Adds a slider to the set.
 *
 * @param {string} label The label of the slider
 * @param {Element} element The element whose opacity will be linked to this slider position
 * @param {string} color The color of the thumb
 */
vgps3.chart.Sliders.prototype.addSlider = function(label, element, color) {
  var slider = new goog.ui.Slider(),
      thumb;

  this.addChild(slider, true);

  slider.setMoveToPointEnabled(true);
  slider.setValue(goog.style.getOpacity(element) * 100);
  thumb = goog.dom.getElementsByTagNameAndClass(null, goog.ui.Slider.THUMB_CSS_CLASS, slider.getElement())[0];
  goog.style.setStyle(thumb, 'background-color', color);
  goog.style.setOpacity(thumb, goog.style.getOpacity(element));
  thumb.title = label;

  this.getHandler().listen(
      slider,
      goog.ui.Component.EventType.CHANGE,
      function(event) {
        var opacity = slider.getValue() / 100;
        goog.style.setOpacity(element, opacity);
        goog.style.setOpacity(thumb, Math.max(0.2, opacity));
      }
  );
};


/**
 * @return {Element} The title div
 */
vgps3.chart.Sliders.prototype.getTitleElement = function() {
  if (!this.isInDocument()) {
    throw Error(goog.ui.Component.Error.NOT_IN_DOCUMENT);
  }
  return this.title_;
};


/** @override */
vgps3.chart.Sliders.prototype.createDom = function() {
  this.element_ = this.dom_.createElement('div');

  goog.dom.appendChild(
      this.element_,
      this.title_ = goog.dom.createDom(
      'div',
      'vgps3-sliders-title',
      goog.dom.htmlToDocumentFragment('<h1>VisuGps?</h1>')
      ));
  goog.style.setStyle(this.element_, {width: '100%', height: '100%'});
};


/** @override */
vgps3.chart.Sliders.prototype.canDecorate = function(element) {
  return false;
};


/** @override */
vgps3.chart.Sliders.prototype.disposeInternal = function() {
  goog.base(this, 'disposeInternal');
  delete this.title_;
};
