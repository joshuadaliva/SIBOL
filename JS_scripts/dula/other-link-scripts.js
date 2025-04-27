const otherLinkHTML = `
    <tr class="bg-white dark:bg-gray-800">
        <th scope="row" class="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            Sa Lilim ng Krus
        </th>
        <td class="px-6 py-3 text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-500">
            <a href="sa-lilim-ng-krus.html">Bisitahin</a>
        </td>
    </tr>
    <tr class="bg-white dark:bg-gray-800">
        <th scope="row" class="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            Pangarap Sa Pandesal
        </th>
        <td class="px-6 py-3 text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-500">
            <a href="pangarap-sa-pandesal.html">Bisitahin</a>
        </td>
    </tr>
    `;

document.getElementById("tbody").innerHTML = otherLinkHTML;
