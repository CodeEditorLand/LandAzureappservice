/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { registerSiteCommand } from "@microsoft/vscode-azext-azureappservice";
import { type AppSettingTreeItem } from "@microsoft/vscode-azext-azureappsettings";
import { openInPortal as uiOpenInPortal } from "@microsoft/vscode-azext-azureutils";
import {
	nonNullValue,
	registerCommandWithTreeNodeUnwrapping,
	unwrapTreeNodeCommandCallback,
	type AzExtTreeItem,
	type IActionContext,
} from "@microsoft/vscode-azext-utils";

import { ext } from "../extensionVariables";
import {
	type DeploymentSlotsNATreeItem,
	type ScaleUpTreeItem,
} from "../tree/DeploymentSlotsTreeItem";
import { addAppSetting } from "./appSettings/addAppSetting";
import { deleteAppSetting } from "./appSettings/deleteAppSettings";
import { downloadAppSettings } from "./appSettings/downloadAppSettings";
import { editAppSetting } from "./appSettings/editAppSetting";
import { renameAppSetting } from "./appSettings/renameAppSetting";
import { toggleSlotSetting } from "./appSettings/toggleSlotSetting";
import { uploadAppSettings } from "./appSettings/uploadAppSettings";
import { browseWebsite } from "./browseWebsite";
import { addCosmosDBConnection } from "./connections/addCosmosDBConnection";
import { removeCosmosDBConnection } from "./connections/removeCosmosDBConnection";
import { revealConnection } from "./connections/revealConnection";
import { revealConnectionInAppSettings } from "./connections/revealConnectionInAppSettings";
import { createSlot } from "./createSlot";
import {
	createWebApp,
	createWebAppAdvanced,
} from "./createWebApp/createWebApp";
import { deleteWebApp } from "./deleteWebApp";
import { deploy } from "./deploy/deploy";
import { deploySlot } from "./deploy/deploySlot";
import { connectToGitHub } from "./deployments/connectToGitHub";
import { disconnectRepo } from "./deployments/disconnectRepo";
import { editScmType } from "./deployments/editScmType";
import { redeployDeployment } from "./deployments/redeployDeployment";
import { viewCommitInGitHub } from "./deployments/viewCommitInGitHub";
import { viewDeploymentLogs } from "./deployments/viewDeploymentLogs";
import { generateDeploymentScript } from "./generateDeploymentScript";
import { installCosmosDBExtension } from "./installCosmosDBExtension";
import { enableFileLogging } from "./logstream/enableFileLogging";
import { startStreamingLogs } from "./logstream/startStreamingLogs";
import { stopStreamingLogs } from "./logstream/stopStreamingLogs";
import { openInPortal } from "./openInPortal";
import { startRemoteDebug } from "./remoteDebug/startRemoteDebug";
import { restartWebApp } from "./restartWebApp";
import { showFile } from "./showFile";
import { startSsh } from "./startSsh";
import { startWebApp } from "./startWebApp";
import { stopWebApp } from "./stopWebApp";
import { swapSlots } from "./swapSlots";
import { viewProperties } from "./viewProperties";

export function registerCommands(): void {
	registerCommandWithTreeNodeUnwrapping(
		"appService.AddAzureDatabasesConnection",
		addCosmosDBConnection,
	);

	registerCommandWithTreeNodeUnwrapping(
		"appService.appSettings.Add",
		addAppSetting,
	);

	registerCommandWithTreeNodeUnwrapping(
		"appService.appSettings.Delete",
		deleteAppSetting,
	);

	registerCommandWithTreeNodeUnwrapping(
		"appService.appSettings.Download",
		downloadAppSettings,
	);

	registerCommandWithTreeNodeUnwrapping(
		"appService.appSettings.Edit",
		editAppSetting,
	);

	registerCommandWithTreeNodeUnwrapping(
		"appService.appSettings.Rename",
		renameAppSetting,
	);

	registerCommandWithTreeNodeUnwrapping(
		"appService.appSettings.ToggleSlotSetting",
		toggleSlotSetting,
	);

	registerCommandWithTreeNodeUnwrapping(
		"appService.appSettings.Upload",
		uploadAppSettings,
	);

	registerCommandWithTreeNodeUnwrapping("appService.Browse", browseWebsite);

	registerCommandWithTreeNodeUnwrapping(
		"appService.ConfigureDeploymentSource",
		editScmType,
	);

	registerCommandWithTreeNodeUnwrapping(
		"appService.connectToGitHub",
		connectToGitHub,
	);

	registerCommandWithTreeNodeUnwrapping("appService.CreateSlot", createSlot);

	registerCommandWithTreeNodeUnwrapping(
		"appService.CreateWebApp",
		createWebApp,
	);

	registerCommandWithTreeNodeUnwrapping(
		"appService.CreateWebAppAdvanced",
		createWebAppAdvanced,
	);

	registerCommandWithTreeNodeUnwrapping("appService.Delete", deleteWebApp);

	registerCommandWithTreeNodeUnwrapping(
		"appService.DeploymentScript",
		generateDeploymentScript,
	);

	registerCommandWithTreeNodeUnwrapping(
		"appService.DisconnectRepo",
		disconnectRepo,
	);

	registerCommandWithTreeNodeUnwrapping(
		"appService.EnableFileLogging",
		enableFileLogging,
	);

	registerCommandWithTreeNodeUnwrapping(
		"appService.InstallCosmosDBExtension",
		installCosmosDBExtension,
	);

	registerCommandWithTreeNodeUnwrapping(
		"appService.LoadMore",
		async (actionContext: IActionContext, node?: AzExtTreeItem) =>
			await ext.rgApi.tree.loadMore(nonNullValue(node), actionContext),
	);

	registerCommandWithTreeNodeUnwrapping("appService.openFile", showFile, 500);

	registerCommandWithTreeNodeUnwrapping(
		"appService.OpenInPortal",
		openInPortal,
	);

	registerCommandWithTreeNodeUnwrapping(
		"appService.Refresh",
		async (actionContext: IActionContext, node?: AzExtTreeItem) =>
			await ext.rgApi.tree.refresh(actionContext, node),
	);

	registerCommandWithTreeNodeUnwrapping(
		"appService.RemoveCosmosDBConnection",
		removeCosmosDBConnection,
	);

	registerCommandWithTreeNodeUnwrapping("appService.Restart", restartWebApp);

	registerCommandWithTreeNodeUnwrapping(
		"appService.RevealConnection",
		revealConnection,
	);

	registerCommandWithTreeNodeUnwrapping(
		"appService.RevealConnectionInAppSettings",
		revealConnectionInAppSettings,
	);

	registerCommandWithTreeNodeUnwrapping(
		"appService.ScaleUp",
		async (
			_context: IActionContext,
			node?: DeploymentSlotsNATreeItem | ScaleUpTreeItem,
		) =>
			await uiOpenInPortal(
				nonNullValue(node),
				nonNullValue(node).scaleUpId,
			),
	);

	registerCommandWithTreeNodeUnwrapping(
		"appService.showOutputChannel",
		() => {
			ext.outputChannel.show();
		},
	);

	registerCommandWithTreeNodeUnwrapping("appService.Start", startWebApp);

	registerCommandWithTreeNodeUnwrapping(
		"appService.StartRemoteDebug",
		startRemoteDebug,
	);

	registerCommandWithTreeNodeUnwrapping("appService.StartSsh", startSsh);

	registerCommandWithTreeNodeUnwrapping(
		"appService.startStreamingLogs",
		startStreamingLogs,
	);

	registerCommandWithTreeNodeUnwrapping("appService.Stop", stopWebApp);

	registerCommandWithTreeNodeUnwrapping(
		"appService.StopLogStream",
		stopStreamingLogs,
	);

	registerCommandWithTreeNodeUnwrapping("appService.SwapSlots", swapSlots);

	registerCommandWithTreeNodeUnwrapping(
		"appService.toggleAppSettingVisibility",
		async (actionContext: IActionContext, node?: AppSettingTreeItem) => {
			await nonNullValue(node).toggleValueVisibility(actionContext);
		},
		250,
	);

	registerCommandWithTreeNodeUnwrapping(
		"appService.ViewCommitInGitHub",
		viewCommitInGitHub,
	);

	registerCommandWithTreeNodeUnwrapping(
		"appService.ViewProperties",
		viewProperties,
	);

	registerSiteCommand(
		"appService.Deploy",
		unwrapTreeNodeCommandCallback(deploy),
	);

	registerSiteCommand(
		"appService.DeploySlot",
		unwrapTreeNodeCommandCallback(deploySlot),
	);

	registerSiteCommand(
		"appService.Redeploy",
		unwrapTreeNodeCommandCallback(redeployDeployment),
	);

	registerSiteCommand(
		"appService.viewDeploymentLogs",
		unwrapTreeNodeCommandCallback(viewDeploymentLogs),
	);
}
