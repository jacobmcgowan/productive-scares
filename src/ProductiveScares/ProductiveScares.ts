import { window, ViewColumn } from 'vscode';
import { Configuration } from "./Configuration";

/**
 * VS Code extension that scares the user.
 */
export class ProductiveScares {
  /**
   * The user configuration.
   */
  private _config: Configuration;

  /**
   * Whether the extension is running or not.
   */
  private _running: boolean;

  /**
   * Whether or not the webview is displayed.
   */
  private _displayed: boolean;

  /**
   * The promise to scare the user.
   */
  private _scarePromise: NodeJS.Timeout | undefined;

  /**
   * Creates a ProductiveScares.
   * @param config The user configuration.
   */
  public constructor(config: Configuration) {
    this._config = config;
    this._running = false;
    this._displayed = false;
  }

  /**
   * Starts the extension.
   */
  public start() {
    if (!this._running) {
      this._running = true;
      this._prepareScare();
    }
  }

  /**
   * Stops the extension.
   */
  public stop() {
    if (this._running) {
      this._running = false;

      if (this._scarePromise) {
        clearTimeout(this._scarePromise);
      }
    }
  }

  /**
   * Sets the timeout to scare the user.
   */
  private _prepareScare() {
    if (this._running) {
      if (this._config.frequencyMax < 1) {
        throw new Error('Max fequency must be at least 1 ms.');
      }

      if (this._config.frequencyMin < 1) {
        throw new Error('Min frequency must be at least 1 ms.');
      }

      if (this._config.frequencyMax < this._config.frequencyMin) {
        throw new Error('Max frequency must be greater than or equal to min frequency.');
      }

      const delta = this._config.frequencyMax - this._config.frequencyMin;
      const frequency = Math.random() * delta + this._config.frequencyMin;

      this._scarePromise = setTimeout(() => this._scare(), frequency);
    }
  }

  /**
   * Displays a jump scare view.
   */
  private _scare() {
    if (!this._displayed) {
      this._displayed = true;
      const panel = window.createWebviewPanel(
        'productiveScares',
        'BOO!',
        ViewColumn.One,
        {}
      );

      panel.webview.html = this._getWebView();

      panel.onDidDispose(() => {
        this._displayed = false;
      })
    }

    this._prepareScare();
  }

  /**
   * Gets the webview.
   * @returns The webview HTML.
   */
  private _getWebView(): string {
    return `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src * https:;">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>BOO!</title>
      </head>
      <body>
        <img src="https://media.giphy.com/media/xTiTnwi8Azjnva46Fq/giphy.gif" width="100%" alt="BOO!"/>
      </body>
      </html>`;
  }
}