class Utils {//thank you stack-overflow for this bountiful harvest
    constructor(props) {
        this.colorArray  = ["#FF178E",
            "#9813EB",
            "#232CFF",
            "#079DEB"];
    }
/*
*
 */
    camelize(str) {
        return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
            return index === 0 ? letter.toLowerCase() : letter.toUpperCase();
        }).replace(/\s+/g, '');
    }
/*
*
 */
    capitalize(str) {
        if (typeof str !== 'string')
            return str;
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
/*
*
 */
    hexToRgb(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }
/*
* Ensures that the available colors are cycled through and re-used properly
*/
    pickColor(key) {
        key = key % this.colorArray.length;
        return this.colorArray[key];
    }

}
export default Utils;