import { SwiftUIModifier } from "types";
import { numberToFixedString } from "../../common/numToAutoFixed";
import { AltNode } from "../../alt_api_types";

/**
 * https://developer.apple.com/documentation/swiftui/view/opacity(_:)
 */
export const swiftuiOpacity = (
  node: MinimalBlendMixin,
): SwiftUIModifier | null => {
  if (node.opacity !== undefined && node.opacity !== 1) {
    return ["opacity", numberToFixedString(node.opacity)];
  }
  return null;
};

/**
 * https://developer.apple.com/documentation/swiftui/view/hidden()
 */
export const swiftuiVisibility = (
  node: SceneNodeMixin,
): SwiftUIModifier | null => {
  // [when testing] node.visible can be undefined
  if (node.visible !== undefined && !node.visible) {
    return ["hidden", ""];
  }
  return null;
};

/**
 * https://developer.apple.com/documentation/swiftui/modifiedcontent/rotationeffect(_:anchor:)
 */
export const swiftuiRotation = (node: AltNode): SwiftUIModifier | null => {
  const rotation = (node.rotation || 0) + (node.cumulativeRotation || 0);
  if (Math.round(rotation) !== 0) {
    return ["rotationEffect", `.degrees(${numberToFixedString(rotation)})`];
  }
  return null;
};

/**
 * https://developer.apple.com/documentation/swiftui/blendmode
 */
export const swiftuiBlendMode = (
  node: MinimalBlendMixin,
): SwiftUIModifier | null => {
  const fromBlendEnum = blendModeEnum(node);
  if (fromBlendEnum) {
    return ["blendMode", fromBlendEnum];
  }

  return null;
};

const blendModeEnum = (node: MinimalBlendMixin): string => {
  switch (node.blendMode) {
    case "COLOR":
      return ".color";
    case "COLOR_BURN":
      return ".colorBurn";
    case "COLOR_DODGE":
      return ".colorDodge";
    case "DIFFERENCE":
      return ".difference";
    case "EXCLUSION":
      return ".exclusion";
    case "HARD_LIGHT":
      return ".hardLight";
    case "HUE":
      return ".hue";
    case "LIGHTEN":
      return ".lighten";
    case "LUMINOSITY":
      return ".luminosity";
    case "MULTIPLY":
      return ".multiply";
    case "OVERLAY":
      return ".overlay";
    case "SATURATION":
      return ".saturation";
    case "SCREEN":
      return ".screen";
    case "SOFT_LIGHT":
      return ".softLight";
    default:
      // PASS_THROUGH, NORMAL, LINEAR_DODGE
      return "";
  }
};
