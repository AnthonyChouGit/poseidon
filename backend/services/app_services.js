/** Fetches all apps from the database
 * @param {Object} pg - The PostgreSQL client
 * @returns {Array} - An array of all apps
 */
const fetchAllApps = async (pg) => {
    try {
        const { rows } = await pg.query("SELECT appid, title, summary, url, about_url, tags, create_at FROM poseidon_apps ORDER BY appid")
        if (rows.length === 0) {
            return {
                success: false,
                data: null,
                message: "No apps found",
                code: 1
            }
        }
        return {
            success: true,
            data: rows,
            message: "Apps fetched successfully",
            code: 0
        }
    } catch (err) {
        console.error("Error fetching apps:", err)
        return {
            success: false,
            data: null,
            message: "Internal server error while fetching apps",
            code: -1
        }
    }
}

export {
    fetchAllApps
}