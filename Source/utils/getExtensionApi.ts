/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { type apiUtils } from "@microsoft/vscode-azext-utils";
import { type AzureHostExtensionApi } from "@microsoft/vscode-azext-utils/hostapi";
import { extensions, type Extension } from "vscode";

import { localize } from "../localize";
import { type AzureDatabasesExtensionApi } from "../vscode-cosmos.api";

export async function getApiExport<T>(
	extensionId: string,
): Promise<T | undefined> {
	const extension: Extension<T> | undefined =
		extensions.getExtension(extensionId);

	if (extension) {
		if (!extension.isActive) {
			await extension.activate();
		}

		return extension.exports;
	}

	return undefined;
}

export async function getResourceGroupsApi(): Promise<AzureHostExtensionApi> {
	const rgApiProvider =
		await getApiExport<apiUtils.AzureExtensionApiProvider>(
			"ms-azuretools.vscode-azureresourcegroups",
		);

	if (rgApiProvider) {
		return rgApiProvider.getApi<AzureHostExtensionApi>("0.0.1");
	} else {
		throw new Error(
			localize(
				"noResourceGroupExt",
				"Could not find the Azure Resource Groups extension",
			),
		);
	}
}

export async function getCosmosDBApi(): Promise<AzureDatabasesExtensionApi> {
	const dbApiProvider =
		await getApiExport<apiUtils.AzureExtensionApiProvider>(
			"ms-azuretools.vscode-cosmosdb",
		);

	if (dbApiProvider) {
		return dbApiProvider.getApi<AzureDatabasesExtensionApi>("^1.0.0");
	} else {
		throw new Error(
			localize(
				"azureDbError",
				'You must have the "Azure Databases" extension installed to perform this operation.',
			),
		);
	}
}
