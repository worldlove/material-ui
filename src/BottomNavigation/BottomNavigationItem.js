import React, {cloneElement} from 'react';
import PropTypes from "prop-types";
import EnhancedButton from '../internal/EnhancedButton';

function getStyles(props, context) {
  const {selected} = props;
  const bottomNavigation = props.theme ? props.theme : context.muiTheme.bottomNavigation;

  const color = selected ?
    bottomNavigation.selectedColor :
    bottomNavigation.unselectedColor;

  const styles = {
    root: {
      transition: 'padding-top 0.3s',
      paddingTop: selected ? 6 : 7,
      paddingBottom: 10,
      paddingLeft: 12,
      paddingRight: 12,
      minWidth: 60,
      maxWidth: 120,
    },
    label: {
      fontSize: selected ?
        bottomNavigation.selectedFontSize :
        bottomNavigation.unselectedFontSize,
      transition: 'color 0.3s, font-size 0.3s',
      color: color,
    },
    icon: {
      display: 'block',
      /**
       * Used to ensure SVG icons are centered
       */
      fontSize: bottomNavigation.iconHeight,
      height: bottomNavigation.iconHeight,
      transition: 'color 0.3s, font-size 0.3s',
      width: '100%',
      color: color,
    },
    iconColor: color,
  };

  return styles;
}

const BottomNavigationItem = (props, context) => {
  const {
    label,
    icon,
    style,
    theme,
    ...other
  } = props;

  const {prepareStyles} = context.muiTheme;
  const styles = getStyles(props, context);

  const styledIcon = cloneElement(icon, {
    style: Object.assign({}, styles.icon, icon.props.style),
    color: icon.props.color || styles.iconColor,
  });

  return (
    <EnhancedButton {...other} style={Object.assign({}, styles.root, style)}>
      {styledIcon}
      <div style={prepareStyles(styles.label)}>
        {label}
      </div>
    </EnhancedButton>
  );
};

BottomNavigationItem.propTypes = {
  /**
   * Set the icon representing the view for this item.
   */
  icon: PropTypes.node,
  /**
   * Set the label describing the view for this item.
   */
  label: PropTypes.node,
  /**
   * @ignore
   * Override the inline-styles of the root element.
   */
  style: PropTypes.object,
  /**
   * Override the default theme.
   */
  theme: PropTypes.object,
};

BottomNavigationItem.contextTypes = {
  muiTheme: PropTypes.object.isRequired,
};

export default BottomNavigationItem;
