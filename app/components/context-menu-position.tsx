export default  {
    _clickInsideElement(e, className, tagName) {
        var el = e.target;      
        if ( tagName && el.tagName !== tagName.toUpperCase() ) {
            return false;
        }  
        if ( el.classList.contains(className) ) {
          return el;
        } else {
          while ( el.parentNode ) {
            el = el.parentNode;  
            if ( el.classList && el.classList.contains(className) ) {
              return el;
            }
          }
        }
        return false;
    },

    _getPosition(e) {
        var posx = 0;
        var posy = 0; 
        
        if (e.clientX || e.clientY) {
          posx = e.clientX + document.body.scrollLeft + 
                             document.documentElement.scrollLeft;
          posy = e.clientY + document.body.scrollTop + 
                             document.documentElement.scrollTop;
        }
      
        return {
          x: posx,
          y: posy
        }
    },

    _positionMenu(e) : { positionX: any, positionY: any} {
        let menuPosition = this._getPosition(e);
        let positionX : string = menuPosition.x + "px";
        let positionY : string = menuPosition.y + "px";
      
        return { positionX, positionY};       
    }

}