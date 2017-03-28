import {Widget, VDOM, getContent} from '../../ui/Widget';
import {Field} from './Field';
import {KeyCode} from '../../util/KeyCode';
import {parseStyle} from '../../util/parseStyle';
import {tooltipParentWillReceiveProps, tooltipParentWillUnmount, tooltipMouseMove, tooltipMouseLeave, tooltipParentDidMount} from '../overlay/Tooltip';
import {stopPropagation} from '../../util/eventCallbacks';
import {preventFocus} from '../../ui/FocusManager';

export class Switch extends Field {

   declareData() {
      super.declareData({
         on: false,
         off: true,
         value: undefined,
         disabled: undefined,
         readOnly: undefined,
         text: undefined,
         rangeStyle: {
            structured: true
         },
         handleStyle: {
            structured: true
         }
      }, ...arguments);
   }

   init() {
      if (typeof this.value != 'undefined')
         this.on = this.value;

      this.rangeStyle = parseStyle(this.rangeStyle);
      this.handleStyle = parseStyle(this.handleStyle);

      super.init();
   }

   prepareData(context, instance) {
      let {data} = instance;

      if (typeof this.off != 'undefined')
         data.on = !data.off;

      data.stateMods = {
         ...data.stateMods,
         on: data.on,
         disabled: data.disabled
      };
      super.prepareData(context, instance);
   }

   renderInput(context, instance, key) {
      let {data} = instance;
      let {rangeStyle, handleStyle} = data;
      let {CSS, baseClass} = this;

      let text = data.text || getContent(this.renderChildren(context, instance));

      return <div key={key}
         className={data.classNames}
         style={data.style}
         id={data.id}
         tabIndex={data.readOnly || data.disabled ? null : 0}
         onMouseDown={e=>{
            e.stopPropagation();
            if (!this.focusOnMouseDown)
               preventFocus(e);
         }}
         onClick={e=>{this.toggle(e, instance)}}
         onKeyDown={e=>{
            if (e.keyCode == KeyCode.space) {
               this.toggle(e, instance);
            }
         }}
      >
         &nbsp;
         <div className={CSS.element(baseClass, "axis")}>
            <div className={CSS.element(baseClass, "range")} style={parseStyle(rangeStyle)}/>
            <div className={CSS.element(baseClass, "space")}>
               <div className={CSS.element(baseClass, "handle")} style={parseStyle(handleStyle)}/>
            </div>
         </div>
         {
            text &&
            <div key="text" className={CSS.element(this.baseClass, "text")}>
               {text}
            </div>
         }
      </div>;
   }

   toggle(e, instance) {
      let {data} = instance;
      if (data.readOnly || data.disabled)
         return;
      instance.set('on', !data.on);
      instance.set('off', data.on);
      e.preventDefault();
      e.stopPropagation();
   }
}

Switch.prototype.baseClass = "switch";
Switch.prototype.focusOnMouseDown = false;

Widget.alias('switch', Switch);