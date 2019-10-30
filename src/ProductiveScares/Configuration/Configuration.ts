import { WorkspaceConfiguration, workspace } from "vscode";
import { IConfiguration } from "./IConfiguration";

/**
 * Defines the user configuration of ProductiveScares.
 */
export class Configuration implements IConfiguration {
  /**
   * The user configuration of ProductiveScares.
   */
  private get _config(): WorkspaceConfiguration {
    return workspace.getConfiguration('productiveScares');
  }

  /**
   * The minimum time to wait before scaring the user.
   */
  public get frequencyMin(): number {
    return this._config['frequencyMin'];
  }

  /**
   * The maximum time to wait before scaring the user.
   */
  public get frequencyMax(): number {
    return this._config['frequencyMax'];
  }
}