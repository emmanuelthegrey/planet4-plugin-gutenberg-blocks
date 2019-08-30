<?php
/**
 * P4 Commands Controller class
 *
 * @package P4GBKS
 * @since 1.40.0
 */

namespace P4GBKS\Command;

use WP_CLI;

if ( defined( 'WP_CLI' ) && WP_CLI && ! class_exists( 'Controller' ) ) {

	/**
	 * In this class every method we add becomes a WP_CLI sub-command for `wp p4-blocks`.
	 *
	 * @package P4BKS\Command
	 */
	class Controller {
		/**
		 * Sub command that converts shortcodes to Gutenberg html comments
		 *
		 * @param array $args Sub-command parameters.
		 *
		 * @throws WP_CLI\ExitException The thrown exception.
		 */
		public function convert_to_gutenberg( $args ) {
			// Supply a post ID as first argument to update a single, specific post.
			$post_id = $args[0] ?? null;

			try {
				WP_CLI::log( 'Converting to Gutenberg...' );

				$converter = new ShortcodeToGutenberg();
				$converted = $converter->replace_all( $post_id );

				// WP_CLI::log( $converted );

			} catch ( \Error $e ) {
				WP_CLI::error( $e->getMessage() );
			} catch ( \Exception $e ) {
				WP_CLI::log( 'Exception: ' . $e->getMessage() );
			}
		}


		// Add here new sub-commands e.g. wp p4-blocks new_sub_command.
		// public function new_sub_command() {}.
	}
}
