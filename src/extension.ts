import { ProductiveScares } from "./ProductiveScares/ProductiveScares";
import { Configuration } from "./ProductiveScares/Configuration";
import { commands, ExtensionContext } from "vscode";

const productiveScares = new ProductiveScares(new Configuration());

/**
 * Activates the ProductiveScares extension.
 * @param context The context of the extension.
 */
export function activate(context: ExtensionContext) {
  const startCommand = commands
    .registerCommand('productiveScares.start', () => productiveScares.start());
  const stopCommand = commands
    .registerCommand('productiveScares.stop', () => productiveScares.stop());

  context.subscriptions.push(startCommand);
}

/**
 * Deactivates the ProductiveScares extension.
 */
export function deactivate() {}
