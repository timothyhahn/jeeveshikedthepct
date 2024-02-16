<script lang="ts">
	import DropdownItem from '$lib/components/DropdownItem.svelte';
	import Dropdown from '$lib/components/Dropdown.svelte';
</script>

<div class="bg-white py-24 sm:py-32">
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<div class="mx-auto max-w-2xl lg:mx-0">
			<h2 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
				Jeeves Hiked the PCT
			</h2>
			<Dropdown name="Part 1 - The Desert">
				<DropdownItem link="/chapters/01-chapter-1">Chapter 1 - Mexico to Idyllwild</DropdownItem>
				<DropdownItem link="/chapters/02-chapter-2"
					>Chapter 2 - Idyllwild to Wrightwood</DropdownItem
				>
				<DropdownItem link="/chapters/03-chapter-3"
					>Chapter 3 - Wrightwood to Tehachapi</DropdownItem
				>
				<DropdownItem link="/chapters/04-chapter-4"
					>Chapter 4 - Tehachapi to Kennedy Meadows</DropdownItem
				>
			</Dropdown>
			<Dropdown name="Part 2 - The Sierras">
				<DropdownItem link="/chapters/05-chapter-5"
					>Chapter 5 - Kennedy Meadows to Bishop</DropdownItem
				>
				<DropdownItem link="/chapters/06-chapter-6"
					>Chapter 6 - Bishop to Vermillion Valley Resort</DropdownItem
				>
				<DropdownItem link="/chapters/07-chapter-7"
					>Chapter 7 - Vermillion Valley Resort to South Lake Tahoe</DropdownItem
				>
			</Dropdown>
			<Dropdown name="Part 3 - Northern California and Fires">
				<DropdownItem link="/chapters/08-chapter-8"
					>Chapter 8 - South Lake Tahoe to Chester</DropdownItem
				>
				<DropdownItem link="/chapters/09-chapter-9">Chapter 9 - Chester to Mt Shasta</DropdownItem>
				<DropdownItem link="/chapters/10-intermission-1"
					>Intermission 1- Mt Shasta and Bend</DropdownItem
				>
			</Dropdown>
			<Dropdown name="Part 4 - Northern Oregon and Washington">
				<DropdownItem link="/chapters/11-chapter-10"
					>Chapter 10 - Timberline Lodge to Chinook Pass</DropdownItem
				>
				<DropdownItem link="/chapters/12-intermission-2">Intermission 2 - Yakima</DropdownItem>
				<DropdownItem link="/chapters/13-chapter-11"
					>Chapter 11 - Chinook Pass to Stehekin</DropdownItem
				>
				<DropdownItem link="/chapters/14-chapter-12"
					>Chapter 12 - Stehekin to Rock Pass</DropdownItem
				>
			</Dropdown>
			<Dropdown name="Part 5 - The End">
				<DropdownItem link="/chapters/15-intermission-3"
					>Intermission 3 - Seattle, Ashland, and Mt Shasta</DropdownItem
				>
				<DropdownItem link="/chapters/16-chapter-13">Chapter 13 - Mt Shasta to Ashland</DropdownItem
				>
				<DropdownItem link="/chapters/17-intermission-4">Intermission 4 - Ashland</DropdownItem>
				<DropdownItem link="/chapters/18-chapter-14"
					>Chapter 14 - Ashland to Timberline Lodge</DropdownItem
				>
				<DropdownItem link="/chapters/19-afterword">Afterword</DropdownItem>
			</Dropdown>
		</div>
	</div>
</div>
